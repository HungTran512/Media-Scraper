import axios from 'axios';
import * as cheerio from 'cheerio';

const MAX_RETRIES = 3;

export async function scrapeUrls(url: string, retries = 0):Promise<{ imageUrls: Set<string>, videoUrls: Set<string> }>{
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const imageUrls = new Set<string>();
    const videoUrls = new Set<string>();

    const resolveUrl = (relativeUrl: string) => new URL(relativeUrl, url).href;

    $('img').each((_: any, element: any) => {
      const src =
        $(element).attr('src') ||
        $(element).attr('data-src') ||
        $(element).attr('data-original') ||
        $(element).attr('data-original-uri');
      if (src) {
        imageUrls.add(resolveUrl(src));
      }
    });

    $('video').each((_: any, element: any) => {
      console.log('element', element);
      const src = $(element).attr('src');
      if (src) videoUrls.add(resolveUrl(src));
    });

    $('div.videoDiv video source').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        videoUrls.add(resolveUrl(src));
      }
    });

    console.log('imageUrls', imageUrls);
    console.log('videoUrls', videoUrls);
    return {
      imageUrls,
      videoUrls,
    };
  } catch (error) {
     if (retries < MAX_RETRIES) {
      console.warn(`Retrying (${retries + 1}/${MAX_RETRIES}) for URL: ${url}`);
      return scrapeUrls(url, retries + 1);
    } else {
      console.error(`Failed to scrape URL after ${MAX_RETRIES} attempts: ${url}`, error);
      throw error;
    }
  }
}

import { scrapeUrls } from '../utils/scrapperUtils';
import Media from '../models/Media';
import { Op } from 'sequelize';
import { logger } from '../middlewares/loggerMiddleware';

export class ScraperService {
  async scrapeAndStore(urls: string[]) {
    const results: any = [];

    for (const url of urls) {
      logger.info(`Starting to scrape URL: ${url}`);
      const { imageUrls, videoUrls } = await scrapeUrls(url);
      logger.info(`Scraping complete for URL: ${url}`);

      if (imageUrls.size > 0) {
        for (const imageUrl of imageUrls) {
          const scrape = await Media.create({
            url,
            mediaType: 'image',
            mediaUrl: imageUrl,
          });
          results.push(scrape);
        }
      }

      if (videoUrls.size > 0) {
        for (const videoUrl of videoUrls) {
          const scrape = await Media.create({
            url,
            mediaType: 'video',
            mediaUrl: videoUrl,
          });
          results.push(scrape);
        }
      }

      logger.info(`Stored scraped data for URL: ${url}`);
    }
    return results;
  }

  async getScrapedMedia(
    page: number,
    limit: number,
    searchText: string,
    mediaType: 'image' | 'video' | 'all',
  ) {
    try {
      const offset = (page - 1) * limit;
      const whereClause: any = {};

      if (searchText) {
        whereClause.url = { [Op.like]: `%${searchText}%` };
      }

      if (mediaType !== 'all') {
        whereClause.mediaType = mediaType;
      }

      const { rows: media, count } = await Media.findAndCountAll({
        where: whereClause,
        offset,
        limit,
      });

      return {
        media,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      throw new Error('Failed to retrieve scraped media');
    }
  }
}

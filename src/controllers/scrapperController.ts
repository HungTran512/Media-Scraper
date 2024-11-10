import { Request, Response } from 'express';
import { ScraperService } from '../services/scrapperServices';
import Media from '../models/Media';
import sequelize from '../config/database';

const scraperService = new ScraperService();

export class ScraperController {
  async scrape(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;
      if (!url) {
        res.status(400).json({ error: 'No URLs provided' });
        return;
      }
      const urlList = Array.isArray(url) ? url : [url];

      const results = await scraperService.scrapeAndStore(urlList);

      res.json(results);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Failed to scrape URLs' });
      return;
    }
  }

  async getScrapedMedia(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = '', type = 'all' } = req.query;
      const result = await scraperService.getScrapedMedia(
        Number(page),
        Number(limit),
        search as string,
        type as 'image' | 'video' | 'all',
      );
      res.json({
        media: result.media,
        totalPages: result.totalPages,
        currentPage: Number(page),
        hasNextPage: Number(page) < result.totalPages,
      });
      return;
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve scraped media' });
      return;
    }
  }
  async getAllScrapedUrls(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const { rows: urls, count } = await Media.findAndCountAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('url')), 'url']],
        offset,
        limit: Number(limit),
      });

      res.json({
        urls,
        totalPages: Math.ceil(count / Number(limit)),
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch scraped URLs' });
    }
  }
}

import { Router } from 'express';
import { ScraperController } from '../controllers/scrapperController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const scraperController = new ScraperController();

router.post('/upload', authMiddleware, (req, res) =>
  scraperController.scrape(req, res),
);
router.get('/media', authMiddleware, (req, res) =>
  scraperController.getScrapedMedia(req, res),
);
router.get('/urls', authMiddleware, (req, res) =>
  scraperController.getAllScrapedUrls(req, res),
);
export default router;

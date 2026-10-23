import { expect, test } from '@playwright/test';

export class ArticlePage { 
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByRole('heading', { level: 1 });
  }

async assertArticleTitleIsVisible(title) {
  await test.step(`Assert the article title '${title}' is visible`, async () => {
      await expect(this.articleTitle).toHaveText(title);
    });
  }
}


  
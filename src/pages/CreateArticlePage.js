import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?"
    );
    this.articleBodyField = page.getByPlaceholder(
      'Write your article (in markdown)'
    );
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.articleTitle = page.getByRole('heading', { level: 1 });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillArticleTitle(title) {
    await test.step(`Fill the article title`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleDescription(description) {
    await test.step(`Fill the article description`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillArticleBody(body) {
    await test.step(`Fill the article body`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillArticleTags(tags) {
  await test.step('Fill the article tags', async () => {
    for (const tag of tags) {
      await this.articleTagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    }
    });
  }
}

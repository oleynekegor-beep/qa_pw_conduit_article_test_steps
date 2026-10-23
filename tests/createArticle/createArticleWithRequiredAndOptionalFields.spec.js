import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage; 
let createArticlePage;
let articlePage;
let article;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}${faker.number.int(99999)}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  article = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tags: [faker.lorem.word(), faker.lorem.word()],
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible(); 
  await homePage.clickNewArticleLink();
});

test('Create an article with required and optional fields', async () => {
  await createArticlePage.fillArticleTitle(article.title);
  await createArticlePage.fillArticleDescription(article.description);
  await createArticlePage.fillArticleBody(article.body);
  await createArticlePage.fillArticleTags(article.tags);
  await createArticlePage.clickPublishArticleButton();
  await articlePage.assertArticleTitleIsVisible(article.title);
});

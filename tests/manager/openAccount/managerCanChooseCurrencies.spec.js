import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { expect } from '@playwright/test';


test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */
  const addCustomerPage = new OpenAccountPage(page);
  
  await addCustomerPage.open();
  await addCustomerPage.selectCurrency('Dollar');
  await addCustomerPage.AssertCurrency('Dollar');
  await addCustomerPage.selectCurrency('Pound');
  await addCustomerPage.AssertCurrency('Pound');
  await addCustomerPage.selectCurrency('Rupee');
  await addCustomerPage.AssertCurrency('Rupee');
});

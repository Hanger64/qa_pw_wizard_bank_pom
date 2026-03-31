import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  const accountPage = new AddCustomerPage(page);
  
 
  await accountPage.open();
 
  const firstName = 'Dick';
  const lastName = 'Dickenson';
  const postCode = faker.location.zipCode(); 
  await accountPage.fillFName(firstName);
  await accountPage.fillLName(lastName);
  await accountPage.fillPostCode(postCode);
  await accountPage.AddCustomer();
  await accountPage.reload();
});

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const accountPage = new AddCustomerPage(page);
  const oenAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await accountPage.open();
  await accountPage.clickOpenAcc();
  await oenAccountPage.selectCustomer('Dick Dickenson')
  await oenAccountPage.selectCurrency('Dollar');
  await oenAccountPage.clickProcess();
  await oenAccountPage.reload();
  await oenAccountPage.clickOpenAcc();
  await customersListPage.AssertCustomer();

});

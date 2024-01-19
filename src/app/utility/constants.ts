export const registrationInfo: Array<{ name: string; value: string }> = [
  { name: 'Sole proprietorship', value: 'sole proprietorship' },
  {
    name: 'Limited Liability Company (LLC)',
    value: 'limited liability company (LLC)',
  },
  // { name: 'S-Corp', value: 'S-Corp' },
  // { name: 'C-Corp', value: 'C-Corp' },
  // { name: 'Company Limited by Shares', value: 'Company Limited by Shares' },
  // { name: 'Company Unlimited by Shares', value: 'Company Unlimited by Shares' },
  // {
  //   name: 'Company Limited by Guarantee',
  //   value: 'Company Limited by Guarantee',
  // },
  // { name: 'Incorporated Partnership', value: 'Incorporated Partnership' },
];
export const stagesOptions: Array<{ name: string; value: string }> = [
  { name: 'Idea Stage', value: 'Idea Stage' },
  {
    name: 'Minimum Viable Product (MVP)',
    value: 'Minimum Viable Product (MVP)',
  },
  { name: 'Pre Seed(Pre Revenue)', value: 'Pre Seed(Pre Revenue)' },
  {
    name: 'Pre Seed(Pre Revenue with Traction)',
    value: 'Pre Seed(Pre Revenue with Traction)',
  },
  { name: 'Early Stage', value: 'Early Stage' },
  { name: 'Seed Stage', value: 'Seed Stage' },
  { name: 'Series A+', value: 'Series A+' },
];

export const raisedAmountOptions: Array<{ name: string; value: string }> = [
  { name: 'No money raised', value: 'No money raised' },
  { name: 'Less than $50k', value: 'Less than $50k' },
  { name: 'Between $50k - $350k', value: 'Between $50k - $350k' },
  { name: 'Between $350k - $1M', value: 'Between $350k - $1M' },
  { name: 'More than $1M', value: 'More than $1M' },
];

export const purposeOptions: Array<{ name: string; value: string }> = [
  { name: 'Research and Development', value: 'Research and Development' },
  { name: 'Marketing', value: 'Marketing' },
  { name: 'Scaling', value: 'Scaling' },
  { name: 'Launch', value: 'Launch' },
  { name: 'New Product', value: 'New Product' },
  { name: 'Debts', value: 'Debts' },
  { name: 'Others', value: 'Others' },
];

export const registerAs: Array<{ name: string; value: string }> = [
  { name: 'Organization', value: 'Organization' },
  { name: 'Individual', value: 'Individual' },
];

export const yesOrNo: Array<{ name: string; value: string }> = [
  { name: 'Yes', value: 'yes' },
  { name: 'No', value: 'no' },
];

export const defaultServerError: string = 'Oops! Server error';

export const genderOptions: Array<{ name: string; value: string }> = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Other', value: 'other' },
];

export const signatureMethods: Array<{ name: string; value: string }> = [
  { name: 'Sign here', value: 'sign here' },
  { name: 'Upload signature', value: 'upload signature' },
  { name: 'Send invite', value: 'send invite' },
];

export interface IWizard
{
  _id?: string;
  project: Partial<IProject>;
  settings: Partial<ISettings>;
  delivery: Partial<IDelivery>;
}

export interface IProject
{
  projectName: string;
  projectOwner: string;
  customerName: string;
  contactPhone: string;
  email: string;
  companySite: string;
}

export interface ISettings
{
  email: string;
  language: string;
  timeZone: string;
  communication: string[];
}

export interface IDelivery
{
  address1: string;
  address2: string;
  postCode: number;
  city: string;
  state: string;
  country: string;
}

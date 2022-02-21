export type MenuItem = {
  active: boolean;
  name: string;
  route: string;
};

export type Realty = {
  id?: number | 0;
  name: string;
  number: string | "";
  userPhone?: string | "";
  propertyId?: string | "";
  propertyDate: string;
  address: string;
  commission?: string | "";
  user?: User | null;
  fees?: number | 0; //هتتهمدل ف الباك و هى ب 0
  addedFees?: number | 0; // Optional - Default 0
  numberOfUnits?: number;
  profitRatio?: number;
  revenue?: number;
};

export type abshurStateType = {
  allProperty: Realty[];
  property10Day: Realty[];
  propertyFinished: Realty[];
  propertyEmpty: Realty[];
  units: Unit[];
  currentProperty: Realty | null;
  currentUnits: Unit | null;
  currentMaintenance: [];
  currentOfficeNote: [];
  allChat: [];
  currentChat: [];
};

export type Unit = {
  id?: number | 0;
  unitNumber: string | "";
  rentPrice: number | 0;
  payDate?: string | "";
  rentalDate?: number | 0;
  electricityNumber: string | "";
  paymentPlan?: string | "";
  unitStatus?: string | "";
  notes?: string | "";
  propertyId?: number | 0;
  images: any;
  tenantPhone?: string | "";
  updatedAt?: string | "";
  createdAt?: string | "";
};
export type User = {
  name: string;
  phone: string;
  password?: string;
  role?: string;
  notificationToken?: string | "";
};

export const Realty_Type = {
  empty: "empty",
  ten_days: "ten-days",
  not_paid: "not-paid",
  paid: "paid",
};

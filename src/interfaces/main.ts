export interface SignatureData {
  firstName: string;
  lastName: string;
  title: string;
  dept: string;
  group: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  web: string;
}

export interface SignaturePreviewProps {
  data: SignatureData;
}

export interface InformationFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}
export interface User{
  id:number;
  name:string;
  forename:string;
  picture:URL;
  email:string;
  password:string;
  tel:string;
  roles: [
    {
      role:string,
      activated:boolean,
    }
  ];
}

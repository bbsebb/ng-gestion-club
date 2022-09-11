export interface UserApp{
  id:number;
  email:string;
  token:string,
  roles: [
    {
      role:string,
      activated:boolean,
    }
  ];
}

export interface ListAdUserDto{
  dn: string;
  distinguishedName: string;
  userPrincipalName: string;
  sAMAccountName: string;
  mail: string;
  whenCreated: Date ;
  pwdLastSet: string; 
  userAccountControl: string;
  sn: string;         
  givenName: string;
  cn: string;       
  displayName: string;
  description: string;
}
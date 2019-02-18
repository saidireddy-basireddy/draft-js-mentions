// tslint:disable:interface-name
// tslint:disable:max-line-length
// tslint:disable:class-name
export interface IUserDetails {
  AccountName?: string;
  CellPhone?: string;
  DisplayName?: string;
  Email?: string;
  FirstName?: string;
  HomePhone?: string;
  ID: number;
  JobTitle?: string;
  LastName?: string;
  UserImageURL?: string;
  UserName?: string;
  UserProfileURL?: string;
  WorkPhone?: string;
  IsSiteAdmin?: boolean;
}

/*************************************************** Data Structure for HashTags ***************************************************************/

export interface IMentionSuggestionsConfig {
  suggestionFilteDefaultSize: number;
  suggestionPropToSearchBy: string;
  suggestionFieldId: string;
  suggestionFieldAccountName: string;
  suggestionFieldCellPhone: string;
  suggestionFieldDisplayName: string;
  suggestionFieldEmail: string;
  suggestionFieldFirstName: string;
  suggestionFieldHomePhone: string;
  suggestionFieldJobTitle: string;
  suggestionFieldLastName: string;
  suggestionFieldUserImageURL: string;
  suggestionFieldUserName: string;
  suggestionFieldUserProfileURL: string;
  suggestionFieldWorkPhone: string;
}

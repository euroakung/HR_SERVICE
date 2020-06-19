export class User {
    id: number;
    username: string;
    password: string;
    firstName: string; 
    lastName: string;
    nameTh: string;
    facultyId: string;
    pictureProfile: string;
    token?: string;
    isLoggedIn :boolean;
    role: string;    
}


export class approvE {
    approvE_ID: number;
    approvE_NAME1: string;
    approvE_NAME2: string;
    approvE_STATUS: string; 
    approvE_USE_ID: string;
    facultY_ID: string;
    recorD_STATUS: string; 
}

import { IsDate, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class UpdateUserDTO {
    @IsString()
    fullname: string;
    @IsString()
    password: string;
    @IsString()
    retype_password: string;
    @IsString()
    address: string;
    @IsDate()
    date_of_birth: Date;
    facebook_account_id:number = 0
    google_account_id:number = 0

    constructor(data: any) {
        this.fullname= data.fullname,
        this.address= data.address,
        this.password= data.password,
        this.retype_password= data.retype_password,
        this.date_of_birth= data.date_of_birth,
        this.facebook_account_id= data.facebook_account_id || 0,
        this.google_account_id= data.google_account_id || 0
    }
    
}
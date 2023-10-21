export class UserDto {
	email;
	id;
	phone;
	name;
	second_name;
	surname;
	city;
	description;
	photo;
	certificate;
	master;
	superUser;
	type;

	constructor({
		            email,
                    _id,
		            phone,
		            name,
		            second_name,
		            surname,
		            city,
		            description,
		            photo,
		            certificate,
		            master,
		            superUser,
		            type,
	            }) {
		this.email = email;
		this.id = _id;
		this.phone = phone;
		this.name = name;
		this.second_name = second_name;
		this.surname = surname;
		this.city = city;
		this.description = description;
		this.photo = photo;
		this.certificate = certificate;
		this.master = master;
		this.superUser = superUser;
		this.type = type;
	}
}

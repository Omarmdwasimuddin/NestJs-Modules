import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {

    private employees = [
        {id: 11001, name: "Wasim", post: "Software Engineer"},
        {id: 11002, name: "Ismail", post: "DevOps"},
        {id: 11003, name: "Pranto", post: "Network Engineer"},
        {id: 11004, name: "Sajjad", post: "Grapics Designer"},
        {id: 11005, name: "Abrar", post: "SEO Expart"}
    ];

    getAllEmployees(){
        return this.employees
    }

    getEmployeeById(id: number){
        return this.employees.find((employee) => employee.id === id)
    }

}
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[NestJs Modules](https://docs.nestjs.com/modules#dynamic-modules) repository.

```bash
# create module
$ nest g module employee

# create service
$ nest g service employee

# create controller
$ nest g controller employee
```

![folder img](/public/Img/employee.png)

```bash
# employee.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
    
    @Get()
    getEmployee(){
        return 'Employee data fatched successfully!!'
    }

}
```

![output view](/public/Img/output.png)

```bash
# employee.service.ts
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
```

```bash
# employee.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService){}
    
    @Get()
    getEmployees(){
        return this.employeeService.getAllEmployees();
    }

    @Get(':id')
    getEmployee(@Param('id') id: string){
        return this.employeeService.getEmployeeById(Number(id))
    }

}
```

![output view](/public/Img/output1.png)
![output view](/public/Img/output2.png)

- Modules
একটি module হলো একটি class যা @Module() decorator দ্বারা annotate করা হয়। এই decorator metadata প্রদান করে, যা Nest ব্যবহার করে অ্যাপ্লিকেশনের structure দক্ষভাবে organize এবং manage করতে।

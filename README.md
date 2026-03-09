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

#### Modules

একটি module হলো একটি class যা @Module() decorator দ্বারা annotate করা হয়। এই decorator metadata প্রদান করে, যা Nest ব্যবহার করে অ্যাপ্লিকেশনের structure দক্ষভাবে organize এবং manage করতে।

#### Dynamic modules

Nest-এ dynamic modules আপনাকে এমন module তৈরি করতে দেয় যা runtime-এ configure করা যায়। এটি বিশেষভাবে উপকারী যখন আপনাকে flexible, customizable module প্রয়োজন হয়, যেখানে providers নির্দিষ্ট options বা configurations-এর উপর ভিত্তি করে তৈরি করা যায়। নিচে dynamic modules কীভাবে কাজ করে তার সংক্ষিপ্ত বিবরণ দেওয়া হলো।

```bash

import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}

```

এই module ডিফল্টভাবে Connection provider সংজ্ঞায়িত করে (@Module() decorator metadata-তে), কিন্তু অতিরিক্তভাবে—forRoot() method-এ প্রেরিত entities এবং options objects-এর উপর নির্ভর করে—providers-এর একটি collection expose করে, যেমন repositories। লক্ষ্য করুন যে dynamic module দ্বারা return করা properties base module metadata-কে extend করে (override নয়), যা @Module() decorator-এ সংজ্ঞায়িত করা হয়েছে। এভাবেই statically declare করা Connection provider এবং dynamically generate করা repository providers উভয়ই module থেকে export করা হয়।

যদি আপনি একটি dynamic module global scope-এ register করতে চান, তবে global property-কে true সেট করুন।

```bash

{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}

```

DatabaseModule নিম্নরূপ import এবং configure করা যায়:

```bash

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}

```

যদি আপনি পরে একটি dynamic module re-export করতে চান, তাহলে exports array-তে forRoot() method callটি omit করতে পারেন।

```bash

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}

```
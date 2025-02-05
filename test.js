// import { Test, TestingModule } from '@nestjs/testing';
// import { SchoolRepoService } from './school-repo.service';
// import { faker } from '@faker-js/faker/locale/af_ZA';
// import supertest from 'supertest';

// describe('SchoolRepoService', () => {
//   let service: SchoolRepoService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [{
//         provide: SchoolRepoService,
//         useClass: 
//         }
//       }],
//     }).compile();

//     service = module.get<SchoolRepoService>(SchoolRepoService);
//   });

//   it('should be defined', () => {
//     const request = supertest.agent({} as any)
//     const data = {
//       name: faker.string.alpha(5),
//       total_enrollment: faker.number.int(10000),
//       year_founded: faker.date.anytime,
//       description: faker.string.alpha(500000),
//       website: faker.string.alpha(100),
//       addressData: {},
//       created_at: faker.date.past().toISOString(),
//       updated_at: faker.date.past().toISOString(),
//     };

//     const storeSchoolSpy = jest
//       .spyOn(service, 'create')
//       .mockResolvedValue(data);

//     expect(service).toBeDefined();
//   });
// });

function test() {
  if (true) {
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
  }
}

const arrowFunc = () => {


  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  
};

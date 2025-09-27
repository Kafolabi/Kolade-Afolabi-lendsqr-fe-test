// generateData.ts
import { faker } from "@faker-js/faker";
import * as fs from "fs";

interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  organization: string; // NEW
  dateJoined: string; // NEW
  status: "Active" | "Inactive" | "Pending" | "Blacklisted"; // NEW
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;
  education: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  monthlyIncome: string;
  loanRepayment: string;
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phone: string;
    email: string;
    relationship: string;
  };
}

function generateUsers(count: number): User[] {
  const statuses: User["status"][] = [
    "Active",
    "Inactive",
    "Pending",
    "Blacklisted",
  ];
  const organizations = ["Lendsqr", "Irorun", "Paystack", "Flutterwave"]; // example orgs

  return Array.from({ length: count }).map((_, i) => ({
    id: String(i + 1),
    fullName: faker.person.fullName(),
    phone: "070" + faker.string.numeric(8),
    email: faker.person.firstName() + "@gmail.com",
    organization: faker.helpers.arrayElement(organizations), // random org
    dateJoined: faker.date.past({ years: 3 }).toISOString(), // ISO string
    status: faker.helpers.arrayElement(statuses),
    bvn: faker.string.numeric(11),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    maritalStatus: faker.helpers.arrayElement(["Single", "Married"]),
    savings: faker.number.int({ min: 0, max: 500000 }).toString(),
    loanRepayment: faker.number.int({ min: 0, max: 100000 }).toString(),

    children: faker.helpers.arrayElement(["None", "1", "2", "3+"]),
    residence: faker.helpers.arrayElement([
      "Parent's Apartment",
      "Rented Apartment",
      "Owned House",
    ]),
    education: faker.helpers.arrayElement(["B.Sc", "M.Sc", "PhD", "OND"]),
    employmentStatus: faker.helpers.arrayElement([
      "Employed",
      "Unemployed",
      "Self-employed",
    ]),
    sector: faker.commerce.department(),
    duration: `${faker.number.int({ min: 1, max: 10 })} years`,
    monthlyIncome: `${faker.number.int({
      min: 100000,
      max: 300000,
    })}-${faker.number.int({ min: 300001, max: 500000 })}`,
    loanRepayment: faker.string.numeric(5),
    socials: {
      twitter: `@${faker.internet.username().toLowerCase()}`,
      facebook: faker.person.fullName(),
      instagram: `@${faker.internet.username().toLowerCase()}`,
    },
    guarantor: {
      fullName: faker.person.fullName(),
      phone: "080" + faker.string.numeric(8),
      email: faker.internet.email(),
      relationship: faker.helpers.arrayElement([
        "Brother",
        "Sister",
        "Friend",
        "Colleague",
      ]),
    },
  }));
}

const data = { users: generateUsers(500) };

// write once into db.json
fs.writeFileSync("data/db.json", JSON.stringify(data, null, 2));
console.log("✅ db.json generated with 500 users");

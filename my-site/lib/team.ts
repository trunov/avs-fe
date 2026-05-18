
export interface TeamMember {
  id: string;
  name: string;
  roleKey: string; // i18n key under TeamMembers.roles.{key}
  bioKey: string;  // i18n key under TeamMembers.bios.{key}
  email?: string;
  socialMediaLink?: string;
  profileImage?: string; // URL or imported image
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Person One",
    roleKey: "ceo",
    bioKey: "personOne",
    email: "person.one@avs.ee",
    socialMediaLink: "https://www.linkedin.com/in/...",
    profileImage: "/team/person-one.jpg",
  },
  {
    id: "2",
    name: "Person Two",
    roleKey: "headOfCredit",
    bioKey: "personTwo",
    email: "person.two@avs.ee",
    profileImage: "/team/person-two.jpg",
  },
];
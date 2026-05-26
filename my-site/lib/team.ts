
export interface TeamMember {
  id: string;
  name: string;
  roleKey: string; // i18n key under TeamMembers.roles.{key}
  bioKey: string;  // i18n key under TeamMembers.bios.{key}
  email?: string;
  profileImage?: string; // URL or imported image
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "personOne",
    roleKey: "ceo",
    bioKey: "personOne",
    email: "aleksandr@avs.ee",
    profileImage: "/team/c1.png",
  },
  {
    id: "2",
    name: "personTwo",
    roleKey: "headOfCredit",
    bioKey: "personTwo",
    email: "evelin@avs.ee",
    profileImage: "/team/c2.png",
  },
];
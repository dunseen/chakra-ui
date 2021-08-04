import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";

export default function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start ">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine}>Formulários</NavLink>
        <NavLink icon={RiContactsLine}>Usuários</NavLink>
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <NavLink icon={RiInputMethodLine}>Dashboard</NavLink>
        <NavLink icon={RiGitMergeLine}>Autmotação</NavLink>
      </NavSection>
    </Stack>
  );
}
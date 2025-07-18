import { about } from "./templates/about";
import { contact } from "./templates/contacts";
import { dict } from "./templates/dict";
import { experience } from "./templates/experience";
import { help } from "./templates/help";
import { neofetch } from "./templates/neofetch";
import { projects } from "./templates/projects";
import { skills } from "./templates/skills";
import { theme } from "./templates/themes";

const commands = {
    help: help,
    about: about,
    skills: skills,
    experience: experience,
    contact: contact,
    ls: dict,
    projects: projects,
    neofetch: neofetch,
    whoami: ["Dev Adarsh Pandit"],
    clear: [],
    themes: theme,
  };

export default commands
import {Sections} from "./sections.enum";

export interface ISection {
  /**
   * An unique section ID to identify each section
   */
  _id: Sections;

  /**
   * A font-awesome class for section's icon in the header
   */
  icon:string;

  /**
   * A label to help user understand what section is
   */
  label: string;
}

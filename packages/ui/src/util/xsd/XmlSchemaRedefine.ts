/**
 * Allows simple and complex types, groups, and attribute groups from external schema files to be redefined in
 * the current schema. This class provides versioning for the schema elements. Represents the World Wide Web
 * Consortium (W3C) redefine element.
 */
import {
  QName,
  XmlSchema,
  XmlSchemaAttributeGroup,
  XmlSchemaExternal,
  XmlSchemaGroup,
  XmlSchemaObject,
  XmlSchemaType,
} from '.';

export class XmlSchemaRedefine extends XmlSchemaExternal {
  private attributeGroups = new Map<QName, XmlSchemaAttributeGroup>();
  private groups = new Map<QName, XmlSchemaGroup>();
  private schemaTypes = new Map<QName, XmlSchemaType>();

  private items: XmlSchemaObject[] = [];

  /**
   * Creates new XmlSchemaRedefine
   */
  constructor(parent: XmlSchema) {
    super(parent);
  }

  getAttributeGroups() {
    return this.attributeGroups;
  }

  getGroups() {
    return this.groups;
  }

  getItems() {
    return this.items;
  }

  getSchemaTypes() {
    return this.schemaTypes;
  }
}

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  Icon,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  MenuToggleElement,
  ToolbarItem,
} from '@patternfly/react-core';
import { EllipsisVIcon, ExternalLinkAltIcon, GithubIcon } from '@patternfly/react-icons';
import { BarsIcon } from '@patternfly/react-icons/dist/js/icons/bars-icon';
import React, { FunctionComponent, useRef } from 'react';
import logo from '../assets/logo-kaoto.png';
import { useComponentLink } from '../hooks/ComponentLink';
import { Links } from '../router/links.models';

interface ITopBar {
  navToggle: () => void;
}

const DEFAULT_POPPER_PROPS = {
  position: 'end',
  preventOverflow: true,
} as const;

export const TopBar: FunctionComponent<ITopBar> = (props) => {
  const displayObject = useRef({ default: 'inline', lg: 'stack', '2xl': 'inline' } as const);
  const logoLink = useComponentLink(Links.Home);

  const [isOpen, setIsOpen] = React.useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (event: React.MouseEvent<Element, MouseEvent> | undefined) => {
    event?.stopPropagation();
    setIsOpen(!isOpen);
    const selectedItemId = event?.currentTarget?.id || '';
    if (selectedItemId === 'settings') {
      // TODO: open the settings modal
    } else if (selectedItemId === 'about') {
      // TODO: open the about modal
    } else {
      // ignore unknown menu items
    }
  };

  return (
    <Masthead id="stack-inline-masthead" display={displayObject.current}>
      <MastheadToggle>
        <Button variant="plain" onClick={props.navToggle} aria-label="Global navigation">
          <BarsIcon />
        </Button>
      </MastheadToggle>

      <MastheadMain>
        <MastheadBrand component={logoLink}>
          <img className="shell__logo" src={logo} alt="Kaoto Logo" />
        </MastheadBrand>
      </MastheadMain>

      <MastheadContent>
        <ToolbarItem className="shell__link">
          <Dropdown
            onSelect={onSelect}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle ref={toggleRef} onClick={onToggle} variant="plain" isExpanded={isOpen}>
                <EllipsisVIcon />
              </MenuToggle>
            )}
            isOpen={isOpen}
            onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
            popperProps={DEFAULT_POPPER_PROPS}
          >
            <a href="https://kaoto.io/workshop/" target="_blank">
              <DropdownItem key="tutorial">
                <Icon isInline>
                  <ExternalLinkAltIcon />
                </Icon>
                &nbsp;<span className="pf-u-mr-lg">Tutorials</span>
              </DropdownItem>
            </a>
            <a href="https://kaoto.io/docs/" target="_blank">
              <DropdownItem key="help">
                <Icon isInline>
                  <ExternalLinkAltIcon />
                </Icon>
                &nbsp;<span className="pf-u-mr-lg">Help</span>
              </DropdownItem>
            </a>
            <a href="https://github.com/KaotoIO/kaoto-next/issues/new/choose" target="_blank">
              <DropdownItem key="feedback">
                <Icon isInline>
                  <GithubIcon />
                </Icon>
                &nbsp;<span className="pf-u-mr-lg">Feedback</span>
              </DropdownItem>
            </a>
            <Divider component="li" key="separator1" />
            <DropdownItem id="settings" key="settings" isDisabled>
              Settings
            </DropdownItem>
            <Divider component="li" key="separator2" />
            <DropdownItem id="about" key="about" isDisabled>
              About
            </DropdownItem>
          </Dropdown>
        </ToolbarItem>
      </MastheadContent>
    </Masthead>
  );
};

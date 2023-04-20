"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import BlocksIcon from "../../../public/blocks.svg";
import PuzzlePieceIcon from "../../../public/puzzle_piece.svg";
import TemplateIcon from "../../../public/template.svg";

const COMMUNITY_BASE_PATH = "/community";

const PAGE_PADDING = "20px";

const LayoutWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;

  @media only screen and (max-width: 500px) {
    flex-flow: column;
  }
`;

const ContentPanel = styled.div`
  flex: 1;
  padding: ${PAGE_PADDING};
  display: flex;
  flex-flow: column;
`;

const NavPanel = styled.div`
  flex: 1;
  padding: ${PAGE_PADDING};
  max-width: 250px;
  background-color: #fcfcfc;
  display: flex;
  flex-flow: column;
  gap: 10px;

  @media only screen and (max-width: 500px) {
    max-width: none;
  }
`;

const NavPanelTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0 10px 0;
`;

const NavPanelLinkWrapper = styled.div`
  z-index: 1;
`;

const NavPanelLink = styled(Link)<{ $activeLink: boolean; $disabled: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 8px 16px;

  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "inherit")};
  opacity: ${({ $activeLink, $disabled }) =>
    $disabled ? 0.4 : $activeLink ? 1 : 0.6};
  transition: 0.2s opacity;

  :hover {
    opacity: 1;
  }
`;

const NavPanelLinkIcon = styled.div`
  display: flex;
  width: 20px;
`;
const NavPanelLinkLabel = styled.span``;

const NavPanelActiveLinkIndicator = styled.div`
  position: absolute;
  background-color: #f0f0f0;
  border-radius: 4px;
  transition: 0.2s all;
`;

interface CommunityNavLink {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const NAV_LINKS: CommunityNavLink[] = [
  {
    id: "blocks",
    label: "Blocks",
    href: `${COMMUNITY_BASE_PATH}/blocks`,
    icon: <BlocksIcon />,
  },
  {
    id: "plugins",
    label: "Plugins",
    href: `${COMMUNITY_BASE_PATH}/plugins`,
    icon: <PuzzlePieceIcon />,
  },
  {
    id: "templates",
    label: "Templates",
    href: `${COMMUNITY_BASE_PATH}/templates`,
    icon: <TemplateIcon />,
  },
];

interface IndicatorPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

const getIndicatorPositionStyle = (elem: HTMLElement): IndicatorPosition => {
  const { left, top, width, height } = elem.getBoundingClientRect();

  return {
    left,
    top,
    width,
    height,
  };
};

const CommunityPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const activeLinkRef = useRef<HTMLDivElement | null>(null);
  const [indicatorPosition, setIndicatorPosition] = useState<
    IndicatorPosition | undefined
  >(undefined);

  useLayoutEffect(() => {
    if (!activeLinkRef.current) {
      setIndicatorPosition(undefined);
      return;
    }

    setIndicatorPosition(getIndicatorPositionStyle(activeLinkRef.current));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(e);
  };

  console.log(activeLinkRef, indicatorPosition);

  return (
    <LayoutWrapper>
      <NavPanel>
        <Image
          src="/el_logo.svg"
          alt="Emergent Layers Logo"
          width={87}
          height={24}
        />
        <NavPanelTitle>Community</NavPanelTitle>
        {indicatorPosition && (
          <NavPanelActiveLinkIndicator style={indicatorPosition} />
        )}
        {NAV_LINKS.map((link) => (
          <NavPanelLinkWrapper
            key={`community-nav-link-${link.id}`}
            ref={pathName === link.href ? activeLinkRef : undefined}
          >
            <NavPanelLink
              href={link.href}
              $activeLink={pathName === link.href}
              $disabled={!!link.disabled}
              onClick={handleLinkClick}
            >
              {link.icon && <NavPanelLinkIcon>{link.icon}</NavPanelLinkIcon>}
              <NavPanelLinkLabel>{link.label}</NavPanelLinkLabel>
            </NavPanelLink>
          </NavPanelLinkWrapper>
        ))}
      </NavPanel>
      <ContentPanel>{children}</ContentPanel>
    </LayoutWrapper>
  );
};

export default CommunityPageLayout;

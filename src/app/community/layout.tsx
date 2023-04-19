"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
`;

const NavPanelTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0 10px 0;
`;

const NavPanelLink = styled(Link)<{ $activeLink: boolean; $disabled: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${({ $activeLink }) =>
    $activeLink ? "#f0f0f0" : "transparent"};
  transition: 0.2s background-color;

  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "inherit")};

  :hover {
    background-color: #f0f0f0;
  }
`;

const NavPanelLinkIcon = styled.div`
  display: flex;
  width: 20px;
`;
const NavPanelLinkLabel = styled.span``;

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
    href: `${COMMUNITY_BASE_PATH}/plugins`,
    icon: <TemplateIcon />,
  },
];

const CommunityPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

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
        {NAV_LINKS.map((link) => (
          <NavPanelLink
            href={link.href}
            key={`community-nav-link-${link.id}`}
            $activeLink={pathName === link.href}
            $disabled={!!link.disabled}
          >
            {link.icon && <NavPanelLinkIcon>{link.icon}</NavPanelLinkIcon>}
            <NavPanelLinkLabel>{link.label}</NavPanelLinkLabel>
          </NavPanelLink>
        ))}
      </NavPanel>
      <ContentPanel>{children}</ContentPanel>
    </LayoutWrapper>
  );
};

export default CommunityPageLayout;

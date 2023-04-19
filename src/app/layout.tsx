"use client";

import { Figtree } from "next/font/google";
import styled, { createGlobalStyle } from "styled-components";

import StyledComponentsRegistry from "./lib/registry";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #ffffff;

    font-family: Figtree, sans-serif;
    font-size: 14px;
    color: #252626;
  }

  a {
    color: #252626;
    text-decoration: none;

    :visited {
      color: inherit;
    }
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
`;

// If loading a variable font, you don't need to specify the font weight
const inter = Figtree({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>
          <PageWrapper>{children}</PageWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

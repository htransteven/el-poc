"use client";

import Image from "next/image";
import styled from "styled-components";

const ComingSoonWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
`;

const ComingSoonText = styled.div`
  font-size: 18px;
  color: #a8a8a8;
  text-align: center;
`;

const CommunityPluginsPage = () => {
  return (
    <>
      <h1>Community Plugins</h1>
      <ComingSoonWrapper>
        <Image
          src="/el_logo_only.svg"
          alt="Emergent Layers Logo"
          width={30 * 4}
          height={24 * 4}
        />
        <ComingSoonText>
          Looks like you got here early!
          <br />
          Community plugins are coming soon 😄
        </ComingSoonText>
      </ComingSoonWrapper>
    </>
  );
};

export default CommunityPluginsPage;

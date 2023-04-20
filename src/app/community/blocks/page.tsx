"use client";

import { differenceInDays, format } from "date-fns";
import Image from "next/image";
import { useMemo, useState } from "react";
import styled from "styled-components";

import SearchIcon from "../../../../public/search.svg";

interface CommunityBlock {
  /** UUID */
  id: string;

  name: string;
  author: string;

  /** In a production environment, this would likely be an image asset served by a solution like S3 */
  image: React.ReactNode;

  /** unix timestamp */
  createdDate: number;

  /** unix timestamp */
  updatedDate: number;

  deprecated: boolean;
}

const TilePlaceholderImageWrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  > * {
    opacity: 0.15;
  }
`;

const TilePlaceholderImage = () => {
  return (
    <TilePlaceholderImageWrapper>
      <Image
        src="/blocks.svg"
        width="40"
        height="40"
        alt="Community Block Placeholder Image"
      />
    </TilePlaceholderImageWrapper>
  );
};

const FAKE_DATA: {
  blocks: CommunityBlock[];
} = {
  blocks: [
    {
      id: "1",
      name: "Tesseract Converter",
      author: "Steven Huynh-Tran",
      image: <TilePlaceholderImage />,
      createdDate: 1681946108,
      updatedDate: 1681946108,
      deprecated: false,
    },
    {
      id: "2",
      name: "Quantum Formatter",
      author: "Steven Huynh-Tran",
      image: <TilePlaceholderImage />,
      createdDate: 1548190088,
      updatedDate: 1681946108,
      deprecated: false,
    },
    {
      id: "3",
      name: "Blank Slate",
      author: "Steven Huynh-Tran",
      image: <TilePlaceholderImage />,
      createdDate: 1548190088,
      updatedDate: 1548190088,
      deprecated: true,
    },
  ],
};

const PageTitle = styled.h1``;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  > svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  height: 30px;
  padding: 20px 40px;
  border-radius: 6px;
  outline: none;
  border: 1px solid #ededed;
  transition: 0.2s border;

  :focus {
    border: 1px solid #000000;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`;

const TileWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-flow: column;
  min-width: 200px;
  max-width: 300px;

  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  transition: 0.2s box-shadow;
  cursor: pointer;

  :hover {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
  }
`;

const TileImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
`;

const TileTextWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  flex-flow: column;
  gap: 10px;
`;

const TileTitle = styled.span`
  font-weight: bold;
`;

const TileAuthor = styled.span``;

const TileInfoText = styled.span`
  font-size: 10px;
`;

const Tags = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const TileTag = styled.span<{ $fontColor: string; $backgroundColor: string }>`
  color: ${({ $fontColor }) => $fontColor};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 10px;
  opacity: 0.8;
`;

const CommunityBlockTile = ({
  name,
  author,
  image,
  createdDate,
  updatedDate,
  deprecated,
}: CommunityBlock) => {
  const dateCreated = new Date(createdDate * 1000);
  const dateUpdated = new Date(updatedDate * 1000);

  const showNewTag = differenceInDays(new Date(), dateCreated) <= 30;
  const showRecentlyUpdatedTag = differenceInDays(new Date(), dateUpdated) <= 7;

  return (
    <TileWrapper>
      <TileImageWrapper>{image}</TileImageWrapper>
      <TileTextWrapper>
        <TileTitle>{name}</TileTitle>
        <TileAuthor>{author}</TileAuthor>
        <TileInfoText>
          Created {format(dateCreated, "MMM dd, yyyy")}
        </TileInfoText>
        <TileInfoText>
          Updated {format(dateUpdated, "MMM dd, yyyy @ hh:mm:ss OOOO")}
        </TileInfoText>
      </TileTextWrapper>
      <Tags>
        {showNewTag && (
          <TileTag $fontColor="#ffffff" $backgroundColor="#e2a66c">
            New
          </TileTag>
        )}
        {showRecentlyUpdatedTag && (
          <TileTag $fontColor="#ffffff" $backgroundColor="#2483f3">
            Recently Updated
          </TileTag>
        )}
        {deprecated && (
          <TileTag $fontColor="#ffffff" $backgroundColor="#9f2020">
            Deprecated
          </TileTag>
        )}
      </Tags>
    </TileWrapper>
  );
};

const CommunityBlocksPage = () => {
  const [initialData] = useState(FAKE_DATA);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredData = useMemo(() => {
    return initialData.blocks.reduce((blocks, currBlock) => {
      console.log(searchValue, currBlock.name, currBlock.author);
      if (
        currBlock.name.toLowerCase().includes(searchValue) ||
        currBlock.author.toLowerCase().includes(searchValue)
      ) {
        blocks.push(currBlock);
      }
      return blocks;
    }, [] as CommunityBlock[]);
  }, [initialData.blocks, searchValue]);

  return (
    <>
      <PageTitle>Community Blocks</PageTitle>
      <SearchWrapper>
        <SearchIcon />
        <SearchInput
          placeholder="Search community blocks"
          value={searchValue}
          onChange={handleInputChange}
        />
      </SearchWrapper>
      <ResultsContainer>
        {filteredData.map((block) => (
          <CommunityBlockTile
            key={`community-blocks-tile-${block.id}`}
            {...block}
          />
        ))}
      </ResultsContainer>
    </>
  );
};

export default CommunityBlocksPage;

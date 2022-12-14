import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Search } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

const SearchContainer = styled.div`
  display: flex;
  width: 50%;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 25%;
  margin-top: 10px;
  ${mobile({ border: "none" })}
`;
const Title = styled.h2`
  font-size: 23px;
  ${mobile({ display: "none" })}
`;
const SearchResult = styled.div`
  cursor: pointer;
  background-color: #e8e8e8;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: black;
`;
const SearchParent = styled.span`
  margin: 5px;
  width: 100%;
  height: fit-content;
  border-radius: 20px;
  display: flex;
  padding: 5px;
  background-color: #e8e8e8;
`;
const Input = styled.input`
  border: 1px solid lightgray;
  height: 30px;
  padding: 2px;
  font-size: 15px;
  ${mobile({ width: "80vw" })}
`;
const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Enter Search Item");
    } else {
    try {
      await axios.get(`/api/products/newOrder?search=${search}`).then((res) => {
        if (res.data.length > 0) {
          setSearchResult(res.data);
          setShowSearch(true);
          setSearch("");
        } else {
          toast.warning("No results found");
          setSearch("");
        }
      });
    } catch (error) {
      toast.error("Failed to Load the Search Results");
      }
    }
  };

  return (
    <SearchContainer>
      <Title>Search Products</Title>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
        }}
      >
        <Input
          placeholder="Search item"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchResult([]);
          }}
        />
        <Search
          onClick={handleSearch}
          style={{
            color: "black",
            fontSize: 18,
            marginTop: "10px",
            cursor: "pointer",
          }}
        />
      </div>
      {searchResult.length > 0 && (
        <OutsideClickHandler onOutsideClick={() => setSearchResult([])}>
          <div>
            <div>
              <b>Search Results</b>
            </div>
            {searchResult.map((p) => (
              <div key={p._id}>
                <SearchParent onClick={() => navigate(`/products/${p._id}`)}>
                  <Avatar
                    alt={p.title}
                    src={p.img}
                    style={{ marginTop: "5px" }}
                  />
                  <SearchResult>
                    <p style={{ fontSize: "18px" }}>{p.title}</p>
                  </SearchResult>
                </SearchParent>
              </div>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </SearchContainer>
  );
};

export default SearchBar;

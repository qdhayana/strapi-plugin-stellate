import React, { useState, useEffect } from "react";
import { Box, Button, Flex } from "@strapi/design-system";
import {
  Select,
  Option
} from "@strapi/design-system/Select";
import { getCollectionTypes, refreshCache } from "../utils/api";
import { Alert } from "./Alert";

export const ClearCache = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState("success");
  const [collection, setCollection] = useState("");
  const [options, setOptions] = useState([]);
  const [error, toggleError] = useState(null);

  const handleClick = async () => {
    const queryType = collection.split(" ")[1];
    setLoading(true);
    try {
      await refreshCache(queryType);
      setLoading(false);
      setShowAlert(true);
      setVariant("success");
    } catch {
      setLoading(false);
      setShowAlert(true);
      setVariant("danger");
    }
  };
  useEffect(async () => {
    const response = await getCollectionTypes();
    setOptions(["all", ...response.data]);
  }, []);

  const handleAlertClose = () => setShowAlert(false);
  const handleClear = () => setCollection("");

  return (
    <div>
      <Flex direction="column" gap={6}>
        <Select
          label="Collections"
          value={collection}
          onChange={setCollection}
          placeholder="Select a collection"
          clearLabel="Clear"
          onClear={handleClear}
        >
          {options.map((option) => (
            <Option
              key={option}
              value={`purge ${option} cache`}
            >
              {`Purge ${option} cache`}
            </Option>
          ))}
        </Select>
        <>
          {showAlert ? (
            <Alert variant={variant} onAlertClose={handleAlertClose} />
          ) : null}
          {collection && (
            <Box
              padding={4}
              hasRadius
              background="neutral0"
              shadow="tableShadow"
            >
              <Button fullWidth loading={loading} onClick={handleClick}>
                {collection || "Purge all cache"}
              </Button>
            </Box>
          )}
        </>
      </Flex>
    </div>
  );
};

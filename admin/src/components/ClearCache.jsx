import React, { useState, useEffect } from "react";
import { Box,Button,Stack,Select, Option } from "@strapi/design-system";
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
      <Stack spacing={11}>
        <Select
          id="collections"
          required
          onClear={handleClear}
          error={error}
          value={collection}
          onChange={setCollection}
        >
          {options.map((option) => (
            <Option
              key={option}
              value={`purge ${option} cache`}
            >{`Purge ${option} cache`}</Option>
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
      </Stack>
    </div>
  );
};

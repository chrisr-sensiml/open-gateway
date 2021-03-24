import { CardContent, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SimpleCard } from "../SimpleCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },

  section1: {
    margin: theme.spacing(3, 2),
  },
}));

const DeviceStatus = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  let [config, setConfig] = useState([]);
  let [deviceDisabled, setDeviceDisabled] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}config`).then((res) => {
      setConfig(mapdata(res.data));
    });
  }, []);

  const handleDisconnectRequest = (event, setConfig) => {
    setDeviceDisabled(true);
    axios.get(`${process.env.REACT_APP_API_URL}disconnect`).then((res) => {
      console.log(res.data);
      setConfig(mapdata(res.data));
      setDeviceDisabled(false);
    });
  };

  const handleConnectRequest = (event, setConfig) => {
    setDeviceDisabled(true);
    axios.get(`${process.env.REACT_APP_API_URL}connect`).then((res) => {
      setConfig(mapdata(res.data));
      setDeviceDisabled(false);
    });
  };

  function mapdata(data) {
    if (data.mode) {
      props.setStreamingMode(data.mode);
    }
    props.setIsConnected(data.streaming);
    props.setColumns(Object.keys(data.column_location).sort());
    props.setStreamingSource(data.source);
    props.setDeviceID(data.device_id);
    props.setIsCameraConnected(data.camera_on);
    data.column_location =
      "column_location" in data
        ? Object.keys(data.column_location).sort().join(", ")
        : [];

    return data;
  }

  return (
    <Card>
      <CardContent>
        <div className={classes.section1}>
          <Typography component="h3" variant="h3" color="secondary">
            Device Source
          </Typography>
        </div>
        <Grid container columns spacing={4}>
          <Grid item xs={12} container rows spacing={2}>
            <SimpleCard name="Mode" xs="6" value={config.mode}></SimpleCard>
            <SimpleCard name="Source" xs="6" value={config.source}></SimpleCard>
          </Grid>
          <Grid item xs={12} container rows spacing={2}>
            <SimpleCard
              name="Device ID"
              xs={6}
              value={config.device_id}
            ></SimpleCard>
            {config.mode === "data_capture" ? (
              <SimpleCard
                xs="6"
                name="Sample Rate"
                value={config.sample_rate}
              ></SimpleCard>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            {config.mode === "data_capture" ? (
              <SimpleCard
                name="Sensor Columns"
                value={config.column_location}
                list={true}
              ></SimpleCard>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <div className={classes.controls}>
              {props.isConnected ? (
                <Button
                  color="secondary"
                  variant="contained"
                  aria-label="disconnect"
                  fullWidth={true}
                  disabled={deviceDisabled}
                  onClick={() => {
                    handleDisconnectRequest("clicked", setConfig);
                  }}
                >
                  Disconnect From Device
                </Button>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  aria-label="connect"
                  fullWidth={true}
                  disabled={deviceDisabled}
                  onClick={() => {
                    handleConnectRequest("clicked", setConfig);
                  }}
                >
                  Connect To Device
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;

import { CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { WebCamera } from "../WebCamera";
import { DeviceStatus } from "../DeviceStatus";

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

const Status = (props) => {
  const classes = useStyles();

  return (
    <div class={classes.root}>
      <Grid container rows spacing={6}>
        <Grid item xs={6}>
          <DeviceStatus
            setStreamingMode={props.setStreamingMode}
            setColumns={props.setColumns}
            setStreamingSource={props.setStreamingSource}
            setDeviceID={props.setDeviceID}
            setIsConnected={props.setIsConnected}
            isConnected={props.isConnected}
            setIsCameraConnected={props.setIsCameraConnected}
            isCameraConnected={props.isCameraConnected}
          ></DeviceStatus>
        </Grid>
        <Grid item xs={6}>
          <WebCamera
            setIsCameraConnected={props.setIsCameraConnected}
            isCameraConnected={props.isCameraConnected}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Status;

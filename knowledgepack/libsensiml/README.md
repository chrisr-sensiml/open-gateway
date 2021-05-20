### Running a knowledge pack on the gateway

In some cases you may want to run a Knowledge Pack on the gateway itself. This is currently possible by turning the Knowledge Pack into a shared object file. Download a Knowledge Pack library for your gateway's platform. Unzip the folder and go to the libsensiml directory. Here you will see a libsensiml.a file. You need to convert this to a shared object by running the following.

```bash
ar -x libsensiml.a
gcc -shared -o libsensiml.so *.o
```

Then copy the libsensiml.so file into the open-gateway/knowledgepack/libsensiml folder. 

The gateway will automatically load this file and run it when you are streaming data. To disable this behavior either remove the .so file or set the app.config["RUN_SML_MODEL"] = False

Now connect to your device in data collection mode, switch to the Test Mode tab and click start stream. In the terminal window running the open gateway you will see the model results printed. In the webui you will see the data streaming.
FROM node


# Clean out existing application files
RUN rm -rf /src && mkdir -p /src


# Copy the application into the image
COPY . /src


# Install application dependencies
WORKDIR /src
RUN npm install .


# Setup application entrypoint
EXPOSE 3000
CMD node ./bin/www

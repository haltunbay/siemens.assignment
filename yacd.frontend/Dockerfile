#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base

# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y build-essential nodejs
# End setup


WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build

RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y build-essential nodejs

WORKDIR /src
COPY ["yacd.frontend/yacd.frontend.csproj", "yacd.frontend/"]
RUN dotnet restore "yacd.frontend/yacd.frontend.csproj"
COPY . .
WORKDIR "/src/yacd.frontend"
RUN dotnet build /p:EnvironmentName=Docker "yacd.frontend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish /p:EnvironmentName=Docker "yacd.frontend.csproj" -c Release -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "yacd.frontend.dll"]
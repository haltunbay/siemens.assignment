#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["yacd.backend/yacd.backend.csproj", "yacd.backend/"]
RUN dotnet restore "yacd.backend/yacd.backend.csproj"
COPY . .
WORKDIR "/src/yacd.backend"
RUN dotnet build /p:EnvironmentName=Docker "yacd.backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish /p:EnvironmentName=Docker "yacd.backend.csproj" -c Release -o /app/publish 

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "yacd.backend.dll"]
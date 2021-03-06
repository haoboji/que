// Generated by https://quicktype.io

export interface Status {
  isOnline: boolean;
  timeSinceLastContact: string;
  lastStatusUpdate: string;
  lastKnownState: LastKnownState;
}

export interface LastKnownState {
  ACStats: ACStats;
  AirconSystem: AirconSystem;
  Alerts: Alerts;
  DemoModeSettingsLoaded: boolean;
  LiveAircon: LiveAircon;
  MasterInfo: MasterInfo;
  NV_Limits: NVLimits;
  NV_QuickTimer: NVQuickTimer;
  NV_Schedule: NVSchedule;
  NV_SystemSettings: NVSystemSettings;
  NV_Updates: LastKnownStateNVUpdates;
  RemoteZoneInfo: RemoteZoneInfo[];
  Servicing: Servicing;
  SystemStatus: SystemStatus;
  UserAirconSettings: UserAirconSettings;
}

export interface Serial {
  Cloud: Cloud;
  Modbus: Modbus;
  NV_SystemSettings_Local: NVSystemSettingsLocal;
  NV_Updates: YourSerialNVUpdates;
  SystemState: SystemState;
  SystemStatus_Local: SystemStatusLocal;
}

export interface Cloud {
  ConnectionState: string;
  FailedSentPackets: number;
  ReceivedPackets: number;
  SentPackets: number;
}

export interface Modbus {
  LinkPort: string;
}

export interface NVSystemSettingsLocal {
  Screen: Screen;
  ScreenOffDisabled: boolean;
  Sounds: Sounds;
  amMasterController: boolean;
  isConfigured: boolean;
  isLinkedToCloud: boolean;
}

export interface Screen {
  AutoWake: boolean;
  BrightnessAuto: boolean;
  Brightness_pc: number;
  Timeout_sec: number;
}

export interface Sounds {
  Mute: boolean;
  Volume_pc: number;
}

export interface YourSerialNVUpdates {
  WCPendingUpdates: boolean;
  WCUpdateRefusedVersion: string;
  ZCPendingUpdates: boolean;
  ZCUpdateRefusedVersion: string;
}

export interface SystemState {
  CpuFreq_MHz: number;
  CpuId: string;
  CpuLoad_User: number;
  CpuRev: string;
  CpuTempMax_oC: number;
  CpuTemp_oC: number;
  LastBootWasSafe: boolean;
  LastShutdownReason: string;
  LinkedToMaster: boolean;
  MemUsage_K: number;
  NV_LastBootFromUnsafeUTC: string;
  NV_UnsafeShutdowns: number;
  ScreenIsOn: boolean;
  WCFirmwareVersion: string;
  ZCFirmwareVersion: string;
  hasInternet: boolean;
}

export interface SystemStatusLocal {
  ConnectedToFallBackWifi: boolean;
  LastScreenTouch_UTC: string;
  NTC1Temp_oC: number;
  NTC2Temp_oC: number;
  NV_TemperatureOffset: number;
  SHTHumidity_oC: number;
  SHTTemp_oC: number;
  ScreenInactive: boolean;
  ScreenLocked: boolean;
  Temp_ScreenOffDisabled: boolean;
  TemperatureForUse_oC: number;
  WifiStrength_of3: number;
}

export interface ACStats {
  NV_FanRunTime_10m: number;
  NV_FanRunTime_Total_10m: number;
}

export interface AirconSystem {
  IndoorUnit: IndoorUnit;
  MasterSerial: string;
  OutdoorUnit: AirconSystemOutdoorUnit;
}

export interface IndoorUnit {
  DeviceID_Changed: boolean;
  IndoorFW: number;
  NV_DeviceID: string;
  NV_ModelNumber: number;
  ZoneDetectRun: boolean;
}

export interface AirconSystemOutdoorUnit {
  AOCSoftwareVersion: number;
  HardwareVersion: number;
  MOCSoftwareHardwareVersion: number;
  ModBusAddr: number;
  Model: number;
  ModelNumber: number;
  SoftwareVersion: number;
}

export interface Alerts {
  CleanFilter: boolean;
  DRED: boolean;
  Defrosting: boolean;
}

export interface LiveAircon {
  AmRunningFan: boolean;
  CanRunSystem: boolean;
  CoilInlet: number;
  CompressorCanRun: boolean;
  CompressorCapacity: number;
  CompressorChasingTemperature: number;
  CompressorLiveTemperature: number;
  CompressorMode: string;
  DRM: boolean;
  Defrost: boolean;
  DraftRecutionInfo: string;
  ErrCode: number;
  FanDemandPC: number;
  FanPWM: number;
  FanRPM: number;
  IndoorUnitTemp: number;
  LastCompressorPowerChange: string;
  LastCompressorPowerChange_time: string;
  ModbusErr: number;
  OutdoorUnit: LiveAirconOutdoorUnit;
  SensorErr: number;
  SystemOn: boolean;
  TestCycle: string;
  ZoneDemandSufficient: boolean;
  isAntiFreeze: boolean;
}

export interface LiveAirconOutdoorUnit {
  AmbTemp: number;
  AmbientSensErr: boolean;
  AutoMode: number;
  CoilSenseErr: boolean;
  CoilTemp: number;
  CompMustRunOFF: boolean;
  CompMustRunON: boolean;
  CompPower: number;
  CompRunningPWM: number;
  CompSpeed: number;
  CompressorMode: number;
  CompressorOn: boolean;
  CompressorSetSpeed: number;
  CondPc: number;
  ContFan: boolean;
  DRM: number;
  DRMModeTime_s: number;
  DeIceConfirm_s: number;
  DeIceHoldMax_s: number;
  DeIceHold_s: number;
  DeIceTime_s: number;
  DefrostCycleNo: number;
  DefrostMode: number;
  DischargeTemp: number;
  DriveAOCVersion: number;
  DriveDefault: boolean;
  DriveHP2: boolean;
  DriveMOCVersion: number;
  DriveTemp: number;
  ECFanErr: boolean;
  EEV: Eev;
  EXV: boolean;
  EXVErr: boolean;
  ErrCode_1: number;
  ErrCode_2: number;
  ErrCode_3: number;
  ErrCode_4: number;
  ErrCode_5: number;
  ErrFlag: number;
  EvacMode: boolean;
  FanMode: number;
  FanSetSpeed: number;
  FanSpeed: number;
  Fault: boolean;
  ForcedDefrost: boolean;
  HPErr: boolean;
  HPLPTripTime_s: number;
  HPTripCount: number;
  IndoorEEVTemp: number;
  LPBypass_s: number;
  LPErr: boolean;
  LPTripCount: number;
  Mode: number;
  ODFan: number;
  ODUDefault: boolean;
  ODUSel: number;
  OilReturn: boolean;
  OilReturnEnable: boolean;
  RemoteOnOff: boolean;
  RevTimeout_s: number;
  RevTimoutOn: boolean;
  RevValue: boolean;
  RoomTemp: number;
  RoomTempODU: number;
  RoomTempSet: number;
  SFanErr: boolean;
  ServiceStatusCodes: string;
  SetTempODU: number;
  SuctP0: number;
  SuctTemp: number;
  SuctionSensErr: boolean;
  SupplyPhaseA_Current: number;
  SupplyPhaseB_Current: number;
  SupplyPhaseC_Current: number;
  SupplyVolatge_Vac: number;
  TestModeCooling: boolean;
  TestModeHeating: boolean;
}

export interface Eev {
  ControlStatus: number;
  EvapPress: number;
  EvapTemp: number;
  Opening_pc: number;
  S2Temp: number;
  S4AirTemp: number;
  SuperHeat: number;
  SuperHeatRef: number;
}

export interface MasterInfo {
  CloudConnected: string;
  CloudReachable: boolean;
  ControlAllZones: boolean;
  LiveHumidity_pc: number;
  LiveOutdoorTemp_oC: number;
  LiveTempHysteresis_oC: number;
  LiveTemp_oC: number;
  NV_amSetup: boolean;
  RemoteHumidity_pc: RemoteHumidityPC;
  Sensors: Sensors;
}

export interface RemoteHumidityPC {
  "18K05221": number;
}

export interface Sensors {
  "18K05221": The18K05221;
}

export interface The18K05221 {
  NV_Kind: string;
  NV_isPaired: boolean;
  Signal_of3: number;
}

export interface NVLimits {
  UserSetpoint_oC: { [key: string]: number };
}

export interface NVQuickTimer {
  Master: Master[];
  Zone: Array<Zone[]>;
}

export interface Master {
  OriginalTime: string;
  Status: string;
  Time: string;
  Zones: boolean[];
}

export interface Zone {
  Status: StatusEnum;
  Time: TimeEnum;
  ZoneState: boolean;
}

export enum StatusEnum {
  Stopped = "Stopped",
}

export enum TimeEnum {
  The555555 = "55:55:55",
}

export interface NVSchedule {
  Enabled: boolean;
}

export interface NVSystemSettings {
  AFP_ChaseTemp_oC: number;
  AFP_ExitTemp_oC: number;
  AFP_StartTemp_oC: number;
  AwayMode: AwayMode;
  ControlAircon: ControlAircon;
  DebugEnabled: boolean;
  DebugLoggingEnabled: boolean;
  DraftReductionCompOffTime: number;
  DraftReductionCompPWM: number;
  DraftReductionCompRunTime: number;
  DraftReductionEnabled: boolean;
  EnergyHistory: EnergyHistory;
  Lock: Lock;
  Logs: Logs;
  MaxSecondaryControllers: number;
  PingPeriod_min: number;
  PingUrl: string;
  RFNetworkAddress: number[];
  SystemName: string;
  SystemSetup: SystemSetup;
  Time: TimeClass;
  UpdateTime: string;
  UserACSettings: UserACSettings;
  WebUrl: string;
  enableFastHeat: boolean;
  restoreSettingsOnPowerUp: boolean;
}

export interface AwayMode {
  TemperatureSetpoint_Cool_oC: number;
  TemperatureSetpoint_Heat_oC: number;
}

export interface ControlAircon {
  CompressorLoopTime_s: number;
  CompressorModeAutoSwitchTimeNonVAV_m: number;
  CompressorModeAutoSwitchTimeVAV_m: number;
  CompressorPowerSwitchTime_m: number;
  Ki: string;
  Kp: string;
  VAVThreshold: number;
}

export interface EnergyHistory {
  Interval_min: number;
  Max_oC: number;
  Min_oC: number;
}

export interface Lock {
  Enabled: boolean;
  Passcode: string;
}

export interface Logs {
  errLogDuration_days: number;
  modBusLogDuration_days: number;
  snapshotDebounce_ms: number;
  snapshotLogDuration_days: number;
  snapshotTime_ms: number;
}

export interface SystemSetup {
  MaxCoolCompCapacity: number;
  MaxHeatCompCapacity: number;
  MaxSLFanSpeed: number;
  SectionsAttempted: Array<boolean | null>;
  SetupComplete: boolean;
  SetupSectionsPassed: Array<boolean | null>;
  TestStatus: string[];
}

export interface TimeClass {
  SetAutomatically: boolean;
  TimeMode24h: boolean;
  Timezone: string;
  Timezone_Readable: string;
}

export interface UserACSettings {
  DefrostFanPWM: number;
  FanAlertTime_h: number;
  Fanspeed: Fanspeed;
}

export interface Fanspeed {
  High: number;
  HighDefault: number;
  HighRPM: number;
  Low: number;
  LowDefault: number;
  LowRPM: number;
  Med: number;
  MedDefault: number;
  MedRPM: number;
}

export interface LastKnownStateNVUpdates {
  LastUpdateCheck: string;
  LastUpdatePerformed: string;
}

export interface RemoteZoneInfo {
  CanOperate: boolean;
  LiveHumidity_pc: number;
  LiveTempHysteresis_oC: number;
  LiveTemp_oC: number;
  MaxCoolSetpoint: number;
  MaxHeatSetpoint: number;
  MinCoolSetpoint: number;
  MinHeatSetpoint: number;
  NV_Exists: boolean;
  NV_Title: string;
  NV_VAV: boolean;
  NV_amSetup: boolean;
  RemoteTemperatures_oC: { [key: string]: number };
  Sensors: { [key: string]: Sensor };
  TemperatureSetpoint_Cool_oC: number;
  TemperatureSetpoint_Heat_oC: number;
  ZonePosition: number;
}

export interface Sensor {
  Battery_pc: number;
  Connected: boolean;
  NV_Kind: string;
  NV_isPaired: boolean;
  NV_isViaRepeater: boolean;
  Signal_of3: number;
  TX_Power: number;
  lastRssi: number;
  FW_Version?: number;
}

export interface Servicing {
  NV_ACStateOnError: boolean;
  NV_ErrorHistory: NVErrorHistory[];
  NV_LastZoneCheck: string;
  Overrides: Overrides;
  SelfLearn: SelfLearn;
  Task: number;
}

export interface NVErrorHistory {
  Code: string;
  Description: string;
  Severity: Severity;
  Time: string;
}

export enum Severity {
  NoError = "No Error",
  Stop = "Stop",
  Warning = "Warning",
}

export interface Overrides {
  Compressor_capacity: number;
  Enabled: boolean;
  Fan: string;
  LockOut: boolean;
  Mode: string;
}

export interface SelfLearn {
  Zones_bitmask: number;
}

export interface SystemStatus {
  RequiredZoneFirmware: string;
}

export interface UserAirconSettings {
  AwayMode: boolean;
  EnabledZones: boolean[];
  FanMode: string;
  Mode: string;
  NV_SavedZoneState: boolean[];
  QuietMode: boolean;
  TemperatureSetpoint_Cool_oC: number;
  TemperatureSetpoint_Heat_oC: number;
  isFastHeating: boolean;
  isOn: boolean;
}

export interface ACSystem {
  _links: ACSystemLinksClass;
  _embedded: Embedded;
}

export interface Embedded {
  "ac-system": ACSystemElement[];
}

export interface ACSystemElement {
  type: string;
  serial: string;
  id: string;
  issued: Date;
  expires: Date;
  description: string;
  _links: ACSystemLinks;
}

export interface ACSystemLinks {
  self: SelfClass;
  commands: ACLatestEvents;
  "ac-status": ACLatestEvents;
  "ac-latest-events": ACLatestEvents;
}

export interface ACLatestEvents {
  href: string;
  title: string;
}

export interface SelfClass {
  href: string;
}

export interface ACSystemLinksClass {
  "ac-system": SelfClass;
}

export interface Device {
  id: string;
  deviceName: string;
  pairingToken: string;
  expires: Date;
  _links: Links;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface CMDResponse {
  correlationId: string;
  type: "timeout" | "ack";
  value: { [s: string]: string | number };
  mwcResponseTime: string;
}

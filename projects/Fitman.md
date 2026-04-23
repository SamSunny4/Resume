# FitMan - Gym Management System

A comprehensive gym management application built with .NET MAUI, supporting Windows, Android, iOS, and macOS platforms.

## � Package Installation

### Prerequisites

Before running the application, ensure you have the following installed:

1. **.NET 8.0 SDK**
   - Download from: https://dotnet.microsoft.com/download/dotnet/8.0
   - Verify installation: `dotnet --version`

2. **.NET MAUI Workload**
   ```bash
   # Install .NET MAUI workload
   dotnet workload install maui
   
   # Verify MAUI installation
   dotnet workload list
   ```

3. **Platform-Specific Requirements:**
   - **Windows:** Windows 10/11 with developer mode enabled
   - **Android:** Android SDK, Java SDK (JDK 11 or higher)
   - **iOS/macOS:** Xcode (macOS only)

### Installing NuGet Packages

The project uses NuGet for package management. All required packages are defined in `FitMan.csproj` and will be automatically restored.

**Restore Packages:**
```bash
# Navigate to project directory
cd "D:\Work\new pro_gym\New project with maui\FitMan"

# Restore all NuGet packages
dotnet restore
```

**Manual Package Installation (if needed):**
```bash
# Add a specific package (example)
dotnet add package Microsoft.Maui.Controls --version 8.0.0

# Update all packages
dotnet restore --force
```

### Troubleshooting Package Issues

If you encounter package-related errors:

1. **Clear NuGet cache:**
   ```bash
   dotnet nuget locals all --clear
   ```

2. **Delete bin and obj folders:**
   ```bash
   Remove-Item -Recurse -Force bin, obj
   ```

3. **Restore packages again:**
   ```bash
   dotnet restore
   dotnet build
   ```

---

## �🚀 How to Run the Application

### Running on Windows

1. **Prerequisites:**
   - .NET 8.0 SDK installed
   - Visual Studio 2022 (or VS Code with .NET MAUI extension)
   - Windows 10/11 with developer mode enabled

2. **Build and Run:**
   ```bash
   cd "D:\Work\new pro_gym\New project with maui\FitMan"
   dotnet build -t:Run -f net8.0-windows10.0.19041.0
   ```

3. **Alternative - Direct Execution:**
   ```bash
   & "D:\Work\new pro_gym\New project with maui\FitMan\bin\Debug\net8.0-windows10.0.19041.0\win10-x64\FitMan.exe"
   ```

### Running on Android (Emulator)

1. **Prerequisites:**
   - Android SDK installed
   - Java SDK (JDK) installed (typically bundled with Android Studio)
   - Android Emulator configured (e.g., Pixel emulator)

2. **Start the Emulator:**
   ```bash
   # List available emulators
   emulator -list-avds
   
   # Start the emulator (replace Pixel_9 with your emulator name)
   emulator -avd Pixel_9
   
   # Start ADB server
   adb start-server
   
   # Verify emulator is connected
   adb devices
   ```

3. **Build and Deploy:**
   ```bash
   cd "D:\Work\new pro_gym\New project with maui\FitMan"
   dotnet build -t:Run -f net8.0-android -p:JavaSdkDirectory="C:\Program Files\Android\Android Studio\jbr" -p:AndroidSdkDirectory="%LOCALAPPDATA%\Android\Sdk"
   ```

### Running on Physical Android Device

1. Enable Developer Options and USB Debugging on your device
2. Connect device via USB
3. Verify connection: `adb devices`
4. Run the same build command as emulator deployment

---

## 📋 Application Workflow

### User Journey

```
Application Start
    ↓
Dashboard (Home Screen)
    ├─→ View Statistics (Total Members, Active Members, Today's Check-ins, Monthly Revenue)
    ├─→ Quick Actions (Add Member, Record Fee, Mark Attendance)
    └─→ Due Fees Alerts
    
Navigation Menu (Flyout)
    ├─→ Dashboard
    ├─→ Members Management
    ├─→ Fees Management
    └─→ Attendance Tracking
```

### Core Workflows

#### 1. Member Management Workflow
```
Members Page
    ├─→ View All Members (List with Search)
    ├─→ Add New Member
    │   ├─→ Fill Basic Info (Name, Email, Phone)
    │   ├─→ Add Personal Details (DOB, Gender, Address)
    │   ├─→ Set Membership Type
    │   └─→ Save
    ├─→ View Member Details
    │   ├─→ Personal Information
    │   ├─→ Payment History
    │   ├─→ Attendance Records
    │   └─→ Edit/Delete Options
    └─→ Edit Member
        └─→ Update Information
```

#### 2. Fee Management Workflow
```
Fees Page
    ├─→ View All Payments (Recent & Historical)
    ├─→ Add New Payment
    │   ├─→ Select Member
    │   ├─→ Enter Amount & Payment Method
    │   ├─→ Set Validity Period
    │   ├─→ Generate Receipt Number
    │   └─→ Save Payment
    └─→ View Payment Details
        ├─→ Receipt Information
        └─→ Payment History
```

#### 3. Attendance Tracking Workflow
```
Attendance Page
    ├─→ View Today's Attendance
    ├─→ Mark Check-In
    │   ├─→ Select Member
    │   ├─→ Record Check-In Time
    │   └─→ Save Attendance
    ├─→ Mark Check-Out
    │   └─→ Update Existing Record
    └─→ View Attendance History
```

---

## 🏗️ Application Architecture

### Project Structure

```
FitMan/
├── Models/                      # Data Models
├── Views/                       # UI Pages (XAML + Code-Behind)
├── Services/                    # Business Logic & Data Services
├── Converters/                  # Value Converters for XAML
├── Resources/                   # App Resources (Images, Fonts, Styles)
├── Platforms/                   # Platform-Specific Code
└── Configuration Files          # App.xaml, AppShell.xaml, etc.
```

---

## 📁 File Purposes and Responsibilities

### Core Application Files

| File | Purpose |
|------|---------|
| **App.xaml / App.xaml.cs** | Application entry point, initializes services and dependency injection |
| **AppShell.xaml / AppShell.xaml.cs** | Navigation structure, flyout menu, routing configuration |
| **MainPage.xaml / MainPage.xaml.cs** | Initial/splash page (if used) |
| **MauiProgram.cs** | Configures MAUI app builder, registers services and dependencies |

### Model Files (Models/)

| File | Purpose |
|------|---------|
| **Member.cs** | Member entity with properties: Name, Email, Phone, DOB, Join Date, Membership Type, Status |
| **FeePayment.cs** | Payment record: Amount, Payment Date, Due Date, Payment Method, Receipt Number, Validity Period |
| **Attendance.cs** | Attendance tracking: Member, Check-In/Out times, Date, Notes |
| **MembershipPlan.cs** | Membership plan definitions: Name, Price, Duration (Daily, Weekly, Monthly, etc.) |

### View Files (Views/)

| File | Purpose |
|------|---------|
| **DashboardPage.xaml/.cs** | Main dashboard with statistics and quick actions |
| **MembersPage.xaml/.cs** | List all members with search functionality |
| **AddMemberPage.xaml/.cs** | Form to add new members |
| **EditMemberPage.xaml/.cs** | Form to edit existing member details |
| **MemberDetailsPage.xaml/.cs** | Detailed view of member profile with payment and attendance history |
| **FeesPage.xaml/.cs** | List all fee payments and payment history |
| **AddPaymentPage.xaml/.cs** | Form to record new fee payments |
| **AttendancePage.xaml/.cs** | Track and view member attendance records |

### Service Files (Services/)

| File | Purpose |
|------|---------|
| **DataService.cs** | Central data management service with CRUD operations for Members, Payments, Attendance, and Plans. Handles data persistence using JSON files in app data directory |

### Converter Files (Converters/)

| File | Purpose |
|------|---------|
| **Converters.cs** | Value converters for XAML binding (e.g., date formatting, boolean to text, status colors) |

### Resource Files (Resources/)

| Directory | Purpose |
|-----------|---------|
| **AppIcon/** | Application icon assets |
| **Fonts/** | Custom fonts used in the app |
| **Images/** | Image resources (icons, logos) |
| **Splash/** | Splash screen assets |
| **Styles/** | XAML style definitions (Colors.xaml, Styles.xaml) |

### Platform-Specific Files (Platforms/)

| Platform | Key Files | Purpose |
|----------|-----------|---------|
| **Android/** | AndroidManifest.xml, MainActivity.cs | Android-specific configuration and initialization |
| **iOS/** | Info.plist, AppDelegate.cs | iOS-specific configuration and lifecycle |
| **Windows/** | Package.appxmanifest, app.manifest | Windows app packaging and permissions |
| **MacCatalyst/** | Info.plist, Entitlements.plist | macOS-specific configuration |

---

## 🎯 Key Features

### 1. Dashboard
- **Statistics Overview:**
  - Total Members Count
  - Active Members Count
  - Today's Check-Ins
  - Monthly Revenue
- **Quick Actions:**
  - Add New Member
  - Record Fee Payment
  - Mark Attendance
- **Alerts:**
  - Members with Due Fees

### 2. Member Management
- Add, Edit, Delete Members
- Search Members by Name, Phone, or Email
- View Member Details:
  - Personal Information
  - Payment History
  - Attendance Records
- Track Member Status (Active/Inactive)
- Store Emergency Contact Information

### 3. Fee Management
- Record Fee Payments
- Multiple Membership Plans:
  - Daily (1 day - ₹100)
  - Weekly (7 days - ₹500)
  - Monthly (30 days - ₹1,500)
  - Quarterly (90 days - ₹4,000)
  - Half-Yearly (180 days - ₹7,500)
  - Yearly (365 days - ₹12,000)
- Payment Methods: Cash, Card, UPI, Bank Transfer
- Auto-generate Receipt Numbers
- Track Payment Validity Period
- View Payment History per Member

### 4. Attendance Tracking
- Mark Check-In/Check-Out
- View Today's Attendance
- Track Attendance History
- Monitor Member Gym Usage Patterns

---

## 💾 Data Storage

The application uses local JSON file storage:
- **Location:** `FileSystem.AppDataDirectory/FitManData/`
- **Files:**
  - `members.json` - Member records
  - `payments.json` - Fee payment records
  - `attendance.json` - Attendance records
  - `plans.json` - Membership plan configurations

### Data Persistence Flow
```
User Action → DataService → In-Memory Lists → JSON Serialization → File System
```

---

## 🛠️ Technology Stack

- **Framework:** .NET MAUI (.NET 8.0)
- **Language:** C#
- **UI:** XAML
- **Data Storage:** JSON files (System.Text.Json)
- **Architecture Pattern:** MVVM-lite (Code-behind with data binding)
- **Dependency Injection:** Built-in .NET DI container
- **Target Platforms:** 
  - Windows (10.0.17763.0+)
  - Android (API 21+)
  - iOS (11.0+)
  - macOS Catalyst (13.1+)

---

## 📊 Data Models Schema

### Member
```csharp
- Id: int
- FirstName: string
- LastName: string
- Email: string
- Phone: string
- DateOfBirth: DateTime
- JoinDate: DateTime
- Address: string
- EmergencyContact: string
- MembershipType: string
- IsActive: bool
- Gender: string
- PhotoPath: string
- Notes: string
```

### FeePayment
```csharp
- Id: int
- MemberId: int
- MemberName: string
- Amount: decimal
- PaymentDate: DateTime
- DueDate: DateTime
- ValidFrom: DateTime
- ValidTo: DateTime
- PaymentMethod: string
- Status: string
- Notes: string
- ReceiptNumber: string
```

### Attendance
```csharp
- Id: int
- MemberId: int
- MemberName: string
- CheckInTime: DateTime
- CheckOutTime: DateTime?
- Date: DateTime
- Notes: string
```

### MembershipPlan
```csharp
- Id: int
- Name: string
- Description: string
- Price: decimal
- DurationDays: int
- IsActive: bool
```

---

## 🔄 Service Methods (DataService.cs)

### Member Operations
- `GetAllMembers()` - Retrieve all members
- `GetActiveMembers()` - Get only active members
- `GetMemberById(int id)` - Find member by ID
- `SearchMembers(string query)` - Search by name, phone, or email
- `AddMember(Member)` - Create new member
- `UpdateMember(Member)` - Update existing member
- `DeleteMember(int id)` - Remove member

### Payment Operations
- `GetAllPayments()` - All payment records
- `GetPaymentsByMember(int memberId)` - Member-specific payments
- `GetRecentPayments(int days)` - Payments within date range
- `GetMembersWithDueFees()` - Members with expired memberships
- `AddPayment(FeePayment)` - Record new payment
- `GetTotalRevenueThisMonth()` - Calculate monthly revenue

### Attendance Operations
- `GetAllAttendance()` - All attendance records
- `GetAttendanceByMember(int memberId)` - Member attendance history
- `GetTodayAttendance()` - Today's check-ins/outs
- `MarkCheckIn(int memberId)` - Record check-in
- `MarkCheckOut(int memberId)` - Record check-out
- `GetTodayCheckInsCount()` - Count of today's check-ins

### Plan Operations
- `GetAllPlans()` - Get all membership plans
- `GetPlanByName(string name)` - Find plan by name
- `InitializeDefaultPlans()` - Create default plan structure

---

## 🎨 UI Components & Styling

### Themes
- Primary Color: Purple (#512BD4)
- UI Framework: Material Design principles
- Responsive layouts for different screen sizes

### Navigation
- **Shell Navigation** with Flyout menu
- Route-based navigation
- Deep linking support

---

## 🔐 Configuration Files

### FitMan.csproj
- Target frameworks configuration
- NuGet package references
- Platform-specific settings
- Asset configuration

### launchSettings.json
- Development environment settings
- Debug configurations

---

## 📱 Platform-Specific Notes

### Windows
- Unpackaged deployment for development
- Self-contained WindowsAppSDK
- Minimum: Windows 10 (10.0.17763.0)

### Android
- Minimum API Level: 21 (Android 5.0)
- Target API: Latest stable
- Requires Java SDK and Android SDK

### iOS
- Minimum: iOS 11.0
- Requires Xcode and macOS for building

### macOS
- macOS Catalyst 13.1+
- Runs on Apple Silicon and Intel Macs

---

## 🚧 Development Guidelines

### Adding New Features
1. Create model classes in `Models/` folder
2. Add service methods in `DataService.cs`
3. Create view pages in `Views/` folder (XAML + code-behind)
4. Register routes in `AppShell.xaml`
5. Update navigation in existing pages

### Data Persistence
- All data operations go through `DataService`
- Changes are automatically persisted to JSON files
- In-memory lists for fast access

### Testing
- Test on emulator/simulator before physical device
- Verify data persistence across app restarts
- Test on all target platforms

---

## 📞 Support & Maintenance

### Common Issues

1. **Build Errors:**
   - Ensure .NET 8.0 SDK is installed
   - Verify all NuGet packages are restored
   - Clean and rebuild solution

2. **Android Deployment Issues:**
   - Verify Java SDK path
   - Check Android SDK installation
   - Ensure emulator is running and connected

3. **Data Not Persisting:**
   - Check file permissions
   - Verify app data directory access
   - Review DataService save methods

---

## 🎯 Future Enhancements (Potential)

- Database integration (SQLite/SQL Server)
- User authentication and roles
- Report generation (PDF/Excel)
- Email/SMS notifications for due fees
- Multi-gym support
- Trainer management
- Workout plan tracking
- Biometric authentication
- Cloud sync support

---

## 📄 License

This is a gym management application built for educational and commercial use.

---

## 👨‍💻 Development Info

- **Framework Version:** .NET 8.0
- **MAUI Version:** Latest stable
- **IDE:** Visual Studio 2022 / VS Code
- **Build Date:** January 2026

---

## 🏁 Quick Start Summary

```bash
# Windows
dotnet build -t:Run -f net8.0-windows10.0.19041.0
or
dotnet build -f net8.0-windows10.0.19041.0
& "D:\Work\new pro_gym\New project with maui\FitMan\bin\Debug\net8.0-windows10.0.19041.0\win10-x64\FitMan.exe"

# Android (with emulator running)
dotnet build -t:Run -f net8.0-android
```

**That's it! You're ready to manage your gym with FitMan! 🏋️‍♂️**

export function getUserAccountControlFlags(value:number) {
  const flags = [
    { class_name:"",hex: 0x0001, name: "SCRIPT", description: "El inicio de sesión de este usuario se ejecuta con un script de inicio." },
    { class_name:"bg-red-200 text-red-500 border-red-500",hex: 0x0002, name: "ACCOUNTDISABLE", description: "La cuenta de usuario está deshabilitada." },
    { class_name:"",hex: 0x0008, name: "HOMEDIR_REQUIRED", description: "Se requiere un directorio principal para la cuenta." },
    { class_name:"",hex: 0x0010, name: "LOCKOUT", description: "La cuenta está bloqueada." },
    { class_name:"bg-orange-200 text-orange-500 border-orange-500",hex: 0x0020, name: "PASSWD_NOTREQD", description: "No se requiere contraseña para la cuenta." },
    { class_name:"",hex: 0x0040, name: "PASSWD_CANT_CHANGE", description: "El usuario no puede cambiar su contraseña." },
    { class_name:"",hex: 0x0080, name: "ENCRYPTED_TEXT_PWD_ALLOWED", description: "Se permite que la contraseña se almacene usando texto cifrado reversible." },
    { class_name:"",hex: 0x0100, name: "TEMP_DUPLICATE_ACCOUNT", description: "Cuenta temporal de usuario de dominio." },
    { class_name:"",hex: 0x0200, name: "NORMAL_ACCOUNT", description: "Cuenta de usuario normal." },
    { class_name:"",hex: 0x0800, name: "INTERDOMAIN_TRUST_ACCOUNT", description: "Cuenta de confianza entre dominios." },
    { class_name:"",hex: 0x1000, name: "WORKSTATION_TRUST_ACCOUNT", description: "Cuenta de confianza de estación de trabajo." },
    { class_name:"",hex: 0x2000, name: "SERVER_TRUST_ACCOUNT", description: "Cuenta de confianza de servidor." },
    { class_name:"bg-gray-200 text-gray-500 border-gray-500",hex: 0x10000, name: "DONT_EXPIRE_PASSWORD", description: "La contraseña de la cuenta no expira." },
    { class_name:"",hex: 0x20000, name: "MNS_LOGON_ACCOUNT", description: "Cuenta MNS de inicio de sesión." },
    { class_name:"",hex: 0x40000, name: "SMARTCARD_REQUIRED", description: "Se requiere tarjeta inteligente para iniciar sesión." },
    { class_name:"",hex: 0x80000, name: "TRUSTED_FOR_DELEGATION", description: "La cuenta está confiada para delegación." },
    { class_name:"",hex: 0x100000, name: "NOT_DELEGATED", description: "La cuenta no puede ser delegada." },
    { class_name:"",hex: 0x200000, name: "USE_DES_KEY_ONLY", description: "La cuenta debe usar claves DES solamente." },
    { class_name:"",hex: 0x400000, name: "DONT_REQ_PREAUTH", description: "No se requiere preautenticación Kerberos." },
    { class_name:"",hex: 0x800000, name: "PASSWORD_EXPIRED", description: "La contraseña de la cuenta ha expirado." },
    { class_name:"",hex: 0x1000000, name: "TRUSTED_TO_AUTH_FOR_DELEGATION", description: "La cuenta está confiada para autenticar por delegación." },
    { class_name:"",hex: 0x04000000, name: "PARTIAL_SECRETS_ACCOUNT", description: "Cuenta de inicio de sesión de servidor de solo secretos parciales." }
  ];

  return flags.filter(flag => (value & flag.hex) === flag.hex);
}
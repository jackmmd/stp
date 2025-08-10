-- CreateEnum
CREATE TYPE "public"."login_type" AS ENUM ('GOOGLE', 'LOCAL');

-- CreateTable
CREATE TABLE "public"."role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "reset_sesion" BOOLEAN DEFAULT false,
    "role_id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "last_access" TIMESTAMP(3),
    "last_change_password" TIMESTAMP(3),
    "login_type" "public"."login_type" NOT NULL DEFAULT 'LOCAL',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "ip_address" TEXT,
    "ip_address_last_access" TEXT,
    "user_agent" TEXT,
    "user_agent_last_access" TEXT,
    "language" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ad_user_log" (
    "id" SERIAL NOT NULL,
    "ticket" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "dni" TEXT,
    "contract_start_date" TIMESTAMP(3) NOT NULL,
    "contract_end_date" TIMESTAMP(3) NOT NULL,
    "company" TEXT,
    "display_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "workplace" TEXT,
    "work_group_or_mailing_list" TEXT,
    "work_group_or_mailing_list2" TEXT,
    "work_group_or_mailing_list3" TEXT,
    "cost_center" TEXT,
    "position" TEXT,
    "management_division" TEXT,
    "phone_number" TEXT,
    "personal_email" TEXT,
    "address" TEXT,
    "employee_id" TEXT,
    "ad_user" BOOLEAN NOT NULL DEFAULT false,
    "licensed_user" BOOLEAN NOT NULL DEFAULT false,
    "observation" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "message" TEXT NOT NULL DEFAULT 'Registrado exitosamente',
    "audit_created_user_id" INTEGER NOT NULL,
    "audit_created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audit_updated_user_id" INTEGER,
    "audit_updated_date" TIMESTAMP(3),
    "audit_deleted_user_id" INTEGER,
    "audit_deleted_date" TIMESTAMP(3),

    CONSTRAINT "ad_user_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "public"."role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "public"."role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "public"."user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ad_user_log_id_key" ON "public"."ad_user_log"("id");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ad_user_log" ADD CONSTRAINT "ad_user_log_audit_created_user_id_fkey" FOREIGN KEY ("audit_created_user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

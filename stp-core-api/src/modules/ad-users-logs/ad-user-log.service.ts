import { ResponseListDto } from "../../others/dto/response.list.dto";
import prisma from "../../config/prisma";
export class AdUserLogService {
  async list() {
    const response = new ResponseListDto()
    response.total_count = await prisma.ad_user_log.count()
    const ad_user_logs = await prisma.ad_user_log.findMany({
      orderBy: { audit_created_date: "desc" },
      select: {
        id: true,
        ticket: true,
        request_date: true,
        name: true,
        lastname: true,
        dni: true,
        contract_start_date: true,
        contract_end_date: true,
        company: true,
        display_name: true,
        email: true,
        workplace: true,
        work_group_or_mailing_list: true,
        work_group_or_mailing_list2: true,
        work_group_or_mailing_list3: true,
        cost_center: true,
        position: true,
        management_division: true,
        phone_number: true,
        personal_email: true,
        address: true,
        employee_id: true,
        ad_user: true,
        licensed_user: true,
        observation: true,
        status: true,
        message: true,
        audit_created_user_id: true,
        audit_created_date: true,
        audit_updated_user_id: true,
        audit_updated_date: true,
        audit_deleted_user_id: true,
        audit_deleted_date: true
      }
    });

    response.items = ad_user_logs
    return response
  }
}
<%@ page language="java" contentType="text/html; charset=UTF-8"
		 import="com.baidu.ueditor.ActionEnter"
		 pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@taglib uri="/struts-tags" prefix="s"%>
<%
	if("uploadimage".equalsIgnoreCase(request.getParameter("action"))){
%><s:action name="UEditorUpload_uploadUEImage" namespace="/common"></s:action><%
	} else if("uploadfile".equalsIgnoreCase(request.getParameter("action"))){
%><s:action name="UEditorUpload_uploadUEFile" namespace="/common"></s:action><%
	} else {
		request.setCharacterEncoding("utf-8");
		response.setHeader("Content-Type", "text/html");
		String rootPath = application.getRealPath( "/" );
		String exec= new ActionEnter( request, rootPath ).exec();
		out.write(exec);
	}
%>
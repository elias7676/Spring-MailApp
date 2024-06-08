package com.elias.springboot.restcrud.dto.MailDto;

public class SendMessageProcDTO {
    private int senderUserId;
    private int[] receiverUserAccountId;
    private String messageBody = "";
    private String subject = "";
    private int forwardedFromId = 0;
    private int threadId = 0;
    private String[] attachment = new String[0];
    private String attachment1 = "";
    private String attachment2 = "";
    private String attachment3 = "";

    // getters and setters
    public int getSenderUserId() {
        return senderUserId;
    }
    public void setSenderUserId(int senderUserId) {
        this.senderUserId = senderUserId;
    }
    public int[] getReceiverUserAccountId() {
        return receiverUserAccountId;
    }
    public void setReceiverUserAccountId(int[] receiverUserAccountId) {
        this.receiverUserAccountId = receiverUserAccountId;
    }
    public String getMessageBody() {
        return messageBody;
    }
    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public int getForwardedFromId() {
        return forwardedFromId;
    }
    public void setForwardedFromId(int forwardedFromId) {
        this.forwardedFromId = forwardedFromId;
    }
    public int getThreadId() {
        return threadId;
    }
    public void setThreadId(int threadId) {
        this.threadId = threadId;
    }
    public String getAttachment1() {
        return attachment1;
    }
    public void setAttachment1(String attachment1) {
        this.attachment1 = attachment1;
    }
    public String getAttachment2() {
        return attachment2;
    }
    public void setAttachment2(String attachment2) {
        this.attachment2 = attachment2;
    }
    public String getAttachment3() {
        return attachment3;
    }
    public void setAttachment3(String attachment3) {
        this.attachment3 = attachment3;
    }
    public String[] getAttachment() {
        return attachment;
    }
    public void setAttachment(String[] attachment) {
        this.attachment = attachment;
    }

}

"use client";
import { ChapterFormPost } from "@/app/types/types.d";
import { register } from "module";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface props {
  submit: SubmitHandler<ChapterFormPost>;
  isEditting: Boolean;
}
const ChapterForm: FC<props> = ({ submit }) => {
  const { register, handleSubmit } = useForm<ChapterFormPost>();
  return (
    <form onSubmit={handleSubmit(submit)}>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-slate-100">chapter title?</span>
        </div>
        <input
          {...register("title")}
          type="text"
          placeholder="title"
          className="input input-bordered w-full text-slate-900"
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-slate-100">
            chapter body content?
          </span>
        </div>
        <textarea
          {...register("body")}
          rows={10}
          placeholder="body content"
          className="textarea textarea-bordered textarea-lg w-fulltext-slate-900"></textarea>
      </label>

      <button className="btn btn-success w-full mt-5">save</button>
    </form>
  );
};

export default ChapterForm;

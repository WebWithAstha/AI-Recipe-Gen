import React from 'react'

export const FormField = ({ id, label, value, onChange, placeholder, type = "input", required = false }) => (
    <div className="w-full">
      <label htmlFor={id} className="block text-md font-medium text-zinc-400 mb-1">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea id={id} value={value} onChange={onChange} placeholder={placeholder} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required={required} />
      ) : (
        <input id={id} value={value} onChange={onChange} placeholder={placeholder} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required={required} type={type} />
      )}
    </div>
  )
